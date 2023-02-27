export class HttpError extends Error {
  status?: number;

  constructor(message?: string, options?: ErrorOptions & { status?: number }) {
    super(message, options);
    this.status = options?.status;
  }
}

export type SerializedFormData = { [k: string]: FormDataEntryValue };

export interface User {
  name: string;
  role: "admin" | "user";
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  createdBy: string;
}
