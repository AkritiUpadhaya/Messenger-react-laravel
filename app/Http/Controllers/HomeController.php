<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Group;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function home()
    {
        $user = Auth::user();
        
        return inertia('HomePage', [
            'conversations' => array_merge(
                User::getUsersExceptUser($user)->toArray(),
                Group::with('users')->get()->map->toConversationArray()->all()
            ),
            'selectedConversation' => null,
            'messages' => []
        ]);
    }

    // Add this method to handle conversation selection
    public function showConversation(User $user = null)
    {
        $messages = [];
        if ($user) {
            $messages = Message::where(function($query) use ($user) {
                $query->where('sender_id', Auth::id())
                      ->where('receiver_id', $user->id)
                      ->orWhere(function($q) use ($user) {
                        $q->where('sender_id', $user->id)
                          ->where('receiver_id', Auth::id());
                    });
          })
          ->latest()
          ->get();
      }

      return inertia('HomePage', [
          'conversations' => array_merge(
              User::getUsersExceptUser(Auth::user())->toArray(),
              Group::with('users')->get()->map->toConversationArray()->all()
          ),
          'selectedConversation' => $user ? $user->toConversationArray() : null,
          'messages' => $messages
      ]);
    }
}