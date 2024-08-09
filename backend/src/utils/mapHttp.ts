const statusMap: { [key: string]: number } = {
  'UNAUTHORIZED': 401,
  'NOT_FOUND': 404,
  'BAD_REQUEST': 400,
  'CONFLICT': 409,
  'SUCCESSFUL': 200,
  'CREATED': 201,
  'UNPROCESSABLE_ENTITY': 422,
  'NO_CONTENT': 204,
  'FORBIDDEN': 403,
  'INTERNAL_SERVER_ERROR': 500,
};

function mapStatusHTTP(status: string): number {
  return statusMap[status] || 500;
}

export default mapStatusHTTP;