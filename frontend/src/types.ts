export type HealthResponse = {
  status: "ok";
  service: string;
  version: string;
};

export type ConnectionState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: HealthResponse }
  | { status: "error"; message: string };
