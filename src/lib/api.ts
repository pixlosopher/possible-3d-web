// API client for the Print3D backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface GenerateJobResponse {
  success: boolean;
  job_id: string;
  message: string;
  status_url: string;
}

export interface JobStatus {
  id: string;
  status: 'pending' | 'generating_image' | 'converting_3d' | 'estimating_cost' | 'completed' | 'failed';
  description: string;
  image_path: string | null;
  mesh_path: string | null;
  cost_estimate: {
    volume_cm3: number;
    materials: Record<string, { price_usd: number }>;
  } | null;
  error_message: string | null;
  completion_time: number | null;
}

export interface CreateCheckoutResponse {
  success: boolean;
  checkout_url: string;
  session_id: string;
}

export async function generateModel(prompt: string, style: string = 'figurine', size_mm: number = 50): Promise<GenerateJobResponse> {
  const response = await fetch(`${API_BASE_URL}/api/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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

export async function getJobStatus(jobId: string): Promise<JobStatus> {
  const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`);

  if (!response.ok) {
    throw new Error('Failed to get job status');
  }

  return response.json();
}

export async function createCheckout(
  jobId: string,
  email: string,
  size: 'small' | 'medium' | 'large',
  material: string,
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }
): Promise<CreateCheckoutResponse> {
  const response = await fetch(`${API_BASE_URL}/api/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      job_id: jobId,
      email,
      size,
      material,
      shipping_address: shippingAddress,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout');
  }

  return response.json();
}

export async function getOrderStatus(orderId: string) {
  const response = await fetch(`${API_BASE_URL}/api/order/${orderId}`);

  if (!response.ok) {
    throw new Error('Failed to get order status');
  }

  return response.json();
}

// Polling helper for job status
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

      if (status.status === 'completed') {
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
