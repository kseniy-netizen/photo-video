<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('icons', function (Blueprint $table) {
            $table->id(); // int8, primary
            $table->string('image_url'); // text
            $table->string('name')->nullable(); // text
            $table->smallInteger('order_index')->default(0); // int2
        });
    }

    public function down()
    {
        Schema::dropIfExists('icons');
    }
};
