export default function mapStatusHttp (status:string):number {
  const httpStatus: Record<string, number> = {
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    INVALID_DATA: 409
  }
  return httpStatus[status] ?? 500
}