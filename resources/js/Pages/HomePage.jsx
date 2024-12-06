import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';

import { Head } from '@inertiajs/react';

function HomePage() {
    return (
        <>
          Messages</>
         
    );
}
HomePage.layout= (page)=>{
    return (
        <>
        <AuthenticatedLayout user={page.props.auth.user}>
            <ChatLayout children={page}/>
        </AuthenticatedLayout>
        </>
        )
    }
export default HomePage;