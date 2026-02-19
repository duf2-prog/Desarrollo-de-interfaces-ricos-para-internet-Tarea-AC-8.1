import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import "../styles/Food.css";

export default function AdminStock() {
    const menu = useSelector((state: RootState) => state.menu);

    return (
        <div>
            <h2 className="subTitle">Stock de productos</h2>
            <ul className="ulApp">
                {menu.map(item => (
                    <li key={item.id} className="liApp">
                    <p className="itemName">{item.name}</p>
                    <p className="itemQty">Disponible: {item.quantity}</p>  
                </li>
                ))}
            </ul>
        </div>
    );
}
