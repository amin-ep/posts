import UsersTable from "../../features/users/UsersTable";
import Container from "../../ui/Container/Container";

function Users() {
  return (
    <Container
      size="extra-large"
      extraClasses={`justify-center flex items-start rounded-lg py-10`}
      background="transparent"
    >
      <UsersTable />
    </Container>
  );
}

export default Users;
