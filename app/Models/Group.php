<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Group extends Model
{
    use HasFactory;
    protected $fillable=[
        'name',
        'details',
        'admin_id',
        'last_message_id',
    ];
    public function users(){
        return $this->belongsToMany(User::class, 'group_users');
    }
    public function messages(){
        return $this->hasMany(Message::class);
    }
    public function owner(){
        return $this->hasMany(User::class);
    }
    public static function getGroupsForUser(User $user){
        $query= self::select(['groups.*','messages.message as last_message', 'messages.created_at as last_message_date'])
        ->join('group_users','group_users.group_id','=','groups.id')
        ->leftJoin('messages','messages.id','=','group.last_messages_id')
        ->where('group_users.user_id', $user->id)
        ->orderBy('messages.created_at', 'desc')
        ->orderBy('groups.name');
        return $query->get();
    }
}
