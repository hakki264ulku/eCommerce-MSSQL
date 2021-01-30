import '../App.css';
import tw from 'twin.macro'
import AdminNavBar from './AdminNavBar'


function AdminOrdersPage() {
    let pageNum = 1
  return (
    <Container>
        <AdminNavBar props={pageNum}/>
    </Container>
  );
}

const Container = tw.div``

export default AdminOrdersPage;
