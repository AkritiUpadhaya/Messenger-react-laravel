<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
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
}
