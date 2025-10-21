import api from "@/interceptor/api";

export async function getItems(){
    const items = await api.get("/pantry", {withCredentials: true});
    return items.data.products ? items.data.products  : [];
}