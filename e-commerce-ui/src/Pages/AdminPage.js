import '../App.css';
import tw from 'twin.macro'
import AdminNavBar from './AdminNavBar'


function AdminPage() {
  return (
    <Container>
        <AdminNavBar />
    </Container>
  );
}

const Container = tw.div``

export default AdminPage;
