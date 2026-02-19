import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import FoodOrder from "../components/FoodOrder";

export default function Order() {
    const { id } = useParams();
    const navigate = useNavigate();

    const food = useSelector((state: RootState) =>
        state.menu.find((item) => item.id === Number(id))
    );

    if (!food) return <p>Producto no encontrado</p>;

    return (
        <FoodOrder
            food={food}
            onReturnMenu={() => navigate("/")}
        />
    );
}
