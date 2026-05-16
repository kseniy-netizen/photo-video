<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('studio', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('image_url');
        });
    }

    public function down()
    {
        Schema::dropIfExists('studio');
    }
};
