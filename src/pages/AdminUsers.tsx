import { useEffect, useState } from "react";
import { FirebaseDatabaseService } from "../services/FirebaseDatabaseService";
import "../styles/AdminUsers.css";

const dbService = new FirebaseDatabaseService();

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            const data = await dbService.getAllUsers();
            setUsers(data);
            setLoading(false);
        };

        loadUsers();
    }, []);

    const toggleRole = async (uid: string, currentRole: boolean) => {
        await dbService.setUserRole(uid, !currentRole);

        setUsers(prev =>
            prev.map(u =>
                u.uid === uid ? { ...u, roles: { admin: !currentRole } } : u
            )
        );
    };

    if (loading) return <p>Cargando usuarios...</p>;

    return (
        <div className="adminUsersContainer">
            <h2 className="subTitle">Gestión de usuarios</h2>

            <table className="usersTable">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user.uid}>
                            <td>{user.email}</td>
                            <td className={user.roles?.admin ? "roleAdmin" : "roleUser"}>
                                {user.roles?.admin ? "ADMIN" : "USER"}
                            </td>
                            <td>
                                <button
                                    className={`btn ${user.roles?.admin ? "admin" : ""}`}
                                    onClick={() => toggleRole(user.uid, user.roles?.admin)}
                                >
                                    {user.roles?.admin ? "Quitar admin" : "Hacer admin"}
                                </button>
                            </td>
                            <td>
                                <button className="btn delete" onClick={() => {
                                    dbService.deleteUser(user.uid)
                                    setUsers(prev => prev.filter(u => u.uid !== user.uid));
                                }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
