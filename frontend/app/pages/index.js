// frontend/pages/index.js
import { useUsers } from '../hooks/useUsers';

export default function Home() {
    const { data, isLoading, error } = useUsers();

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar usuários.</p>;

    return (
        <div>
            <h1>Usuários</h1>
            <ul>
                {data.map((user) => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
}
