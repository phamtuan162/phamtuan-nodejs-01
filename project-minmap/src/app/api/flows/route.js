import flow from "@/data/flow.json";

export function GET(request) {
  const userId = request.nextUrl.searchParams.get("user_id");
  let data = flow.flows;
  if (userId) {
    data = data
      .filter((item) => {
        return userId === item.user_id;
      })
      .sort((a, b) => new Date(b.dateCreate) - new Date(a.dateCreate));
  }

  return Response.json({
    status: "success",
    data,
  });
}
