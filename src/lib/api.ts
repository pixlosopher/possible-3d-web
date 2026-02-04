// API client for the Print3D backend
// Updated for new cost-efficient flow

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============ Types ============

export interface Size {
  key: string;
  name: string;
  name_es: string;
  height_mm: number;
  description: string;
  description_es: string;
  price_multiplier: number;
}

export interface Color {
  key: string;
  name: string;
  name_es: string;
  hex: string;
  price_extra_cents: number;
}

export interface Material {
  key: string;
  name: string;
  name_es: string;
  base_price_cents: number;
  price_multiplier: number;
  colors: Color[];
  supports_full_color: boolean;
  shapeways_material_id: string;
  description: string;
  description_es: string;
}

export interface MeshStyle {
  key: string;
  name: string;
  name_es: string;
  description: string;
  description_es: string;
}

export interface PriceMatrixRow {
  material: Material;
  prices: Record<string, { cents: number; display: string }>;
}

export interface OptionsResponse {
  sizes: Record<string, Size>;
  materials: Record<string, Material>;
  mesh_styles: Record<string, MeshStyle>;
  price_matrix: PriceMatrixRow[];
}

export interface PriceBreakdown {
  material: Material;
  size: Size;
  color: Color | null;
  base_cents: number;
  size_multiplier: number;
  material_multiplier: number;
  color_extra_cents: number;
  total_cents: number;
  total_display: string;
}

export interface GenerateConceptResponse {
  success: boolean;
  job_id: string;
  status: string;
  message: string;
  status_url: string;
}

export interface JobStatus {
  id: string;
  status: 'pending' | 'generating_image' | 'concept_ready' | 'converting_3d' | 'completed' | 'failed';
  description: string;
  image_path: string | null;
  image_url: string | null;
  mesh_path: string | null;
  mesh_url: string | null;
  progress: number;
  error_message: string | null;
  concept_only: boolean;
}

export interface CreateCheckoutResponse {
  success: boolean;
  order_id: string;
  checkout_url: string;
  session_id: string;
  provider: string;
}

export interface ValidateConfigResponse {
  valid: boolean;
  error?: string;
  price?: PriceBreakdown;
}

// ============ API Functions ============

/**
 * Get all available options (sizes, materials, mesh styles, price matrix)
 */
export async function getOptions(): Promise<OptionsResponse> {
  const response = await fetch(`${API_BASE_URL}/api/options`);

  if (!response.ok) {
    throw new Error('Failed to fetch options');
  }

  return response.json();
}

/**
 * Calculate price for a specific configuration
 */
export async function calculatePrice(
  material: string,
  size: string,
  color?: string
): Promise<PriceBreakdown> {
  const response = await fetch(`${API_BASE_URL}/api/price`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ material, size, color }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to calculate price');
  }

  return response.json();
}

/**
 * Validate order configuration before checkout
 */
export async function validateConfig(
  material: string,
  size: string,
  color?: string,
  meshStyle: string = 'detailed'
): Promise<ValidateConfigResponse> {
  const response = await fetch(`${API_BASE_URL}/api/validate-config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      material,
      size,
      color,
      mesh_style: meshStyle
    }),
  });

  return response.json();
}

/**
 * Generate a 2D concept only (new cost-efficient flow)
 * 3D generation happens after payment
 */
export async function generateConcept(
  prompt: string,
  style: string = 'figurine'
): Promise<GenerateConceptResponse> {
  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, style }),
  });

  if (!response.ok) {
    throw new Error('Failed to start generation');
  }

  return response.json();
}

/**
 * Legacy: Generate full model (image + 3D)
 * Use generateConcept for new flow
 */
export async function generateModel(
  prompt: string,
  style: string = 'figurine',
  size_mm: number = 50
): Promise<GenerateConceptResponse> {
  const response = await fetch(`${API_BASE_URL}/api/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      agent_name: 'web_client',
      description: prompt,
      style,
      size_mm,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to start generation');
  }

  return response.json();
}

/**
 * Get job status
 */
export async function getJobStatus(jobId: string): Promise<JobStatus> {
  const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`);

  if (!response.ok) {
    throw new Error('Failed to get job status');
  }

  return response.json();
}

/**
 * Create checkout session with new options
 */
export async function createCheckout(
  jobId: string,
  email: string,
  size: string,
  material: string,
  color?: string,
  meshStyle: string = 'detailed',
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  },
  customHeightMm?: number
): Promise<CreateCheckoutResponse> {
  const response = await fetch(`${API_BASE_URL}/api/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      job_id: jobId,
      email,
      size,
      material,
      color,
      mesh_style: meshStyle,
      shipping_address: shippingAddress || {},
      custom_height_mm: customHeightMm,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout');
  }

  return response.json();
}

/**
 * Get order status
 */
export async function getOrderStatus(orderId: string) {
  const response = await fetch(`${API_BASE_URL}/api/order/${orderId}`);

  if (!response.ok) {
    throw new Error('Failed to get order status');
  }

  return response.json();
}

/**
 * Polling helper for job status
 * Now handles concept_ready status
 */
export function pollJobStatus(
  jobId: string,
  onUpdate: (status: JobStatus) => void,
  onComplete: (status: JobStatus) => void,
  onError: (error: Error) => void,
  intervalMs: number = 2000
): () => void {
  let cancelled = false;

  const poll = async () => {
    if (cancelled) return;

    try {
      const status = await getJobStatus(jobId);
      onUpdate(status);

      // For concept jobs, concept_ready means done (no 3D yet)
      if (status.status === 'completed' || status.status === 'concept_ready') {
        onComplete(status);
        return;
      }

      if (status.status === 'failed') {
        onError(new Error(status.error_message || 'Job failed'));
        return;
      }

      // Continue polling
      setTimeout(poll, intervalMs);
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Unknown error'));
    }
  };

  poll();

  // Return cancel function
  return () => {
    cancelled = true;
  };
}

/**
 * Get full image URL from path
 */
export function getImageUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path}`;
}

/**
 * Get full mesh URL from path
 */
export function getMeshUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path}`;
}

// ============ Regional Pricing Types ============

export interface RegionalSize {
  key: string;
  name: string;
  name_es: string;
  height_mm: number;
  description: string;
  description_es: string;
  price_cents: number;
  price_usd: number;
  price_display: string;
  local_currency: {
    currency_code: string;
    symbol: string;
    amount: number;
    display: string;
  } | null;
}

export interface RegionalPricing {
  country_code: string;
  region: {
    key: string;
    name: string;
    name_es: string;
  };
  currency: string;
  sizes: RegionalSize[];
}

/**
 * Get regional pricing for a specific country
 * Returns prices based on shipping destination (LATAM vs USA/Canada)
 */
export async function getRegionalPricing(countryCode: string): Promise<RegionalPricing> {
  const response = await fetch(`${API_BASE_URL}/api/pricing/${countryCode}`);

  if (!response.ok) {
    throw new Error('Failed to fetch regional pricing');
  }

  return response.json();
}

/**
 * Calculate regional price for a specific size and country
 */
export async function calculateRegionalPrice(
  size: string,
  countryCode: string
): Promise<{
  size_key: string;
  region_key: string;
  country_code: string;
  price_cents: number;
  price_usd: number;
  price_display: string;
  local_currency: {
    currency_code: string;
    symbol: string;
    amount: number;
    display: string;
  } | null;
}> {
  const response = await fetch(`${API_BASE_URL}/api/pricing/${countryCode}/${size}`);

  if (!response.ok) {
    throw new Error('Failed to calculate regional price');
  }

  return response.json();
}

// ============ Custom Height Pricing ============

export interface CustomHeightPrice {
  height_mm: number;
  country_code: string;
  region: {
    key: string;
    name: string;
    name_es: string;
  };
  price_cents: number;
  price_usd: number;
  price_display: string;
  is_custom: boolean;
  constraints: {
    min_height_mm: number;
    max_height_mm: number;
  };
}

/**
 * Calculate price for a custom height
 *
 * @param heightMm - Height in millimeters (30-300mm)
 * @param countryCode - ISO country code (e.g., "MX", "US")
 */
export async function calculateCustomHeightPrice(
  heightMm: number,
  countryCode: string = "MX"
): Promise<CustomHeightPrice> {
  const response = await fetch(`${API_BASE_URL}/api/pricing/custom`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      height_mm: heightMm,
      country_code: countryCode,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to calculate custom height price');
  }

  return response.json();
}
