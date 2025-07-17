<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    protected $fillable = [
        'user_id',
        'start_date',
        'end_date',
        'reason',
        'type',
        'status',
    ];

    /**
     * A leave belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
