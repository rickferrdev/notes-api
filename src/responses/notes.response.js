export default class NotesResponse {
  send(data, response) {
    return response.status(200).send({
      success: true,
      data: {
        items: Array.isArray(data) ? data : [data],
      },
      metadata: {
        count: Array.isArray(data) ? data.length : 1
      },
    });
  }
}
