import { usePage } from '@inertiajs/react'
import React from 'react'
import AuthenticatedLayout from './AuthenticatedLayout';

export default function ChatLayout({children}) {
    const page= usePage;
    const coversations= page.props.conversations;
    const selectedCoversation= page.props.selectedConversation;
    console.log('conversations', coversations);
    console.log('selectedConversation', selectedCoversation);
  return (
    <AuthenticatedLayout>
      ChatLayout
      <div>{children}</div>
      </AuthenticatedLayout>
  )
}
