<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('portfolio', function (Blueprint $table) {
            $table->id();
            $table->string('image_url');
            $table->string('title')->nullable();
            $table->smallInteger('order_index')->default(0);
            // $table->timestamps(); // закомментировано, если в Supabase нет created_at/updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('portfolio');
    }
};
