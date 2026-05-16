<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('specialists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('image_url');
            $table->smallInteger('order_index')->default(0);
            // $table->timestamps(); // если есть created_at/updated_at – раскомментируй
        });
    }

    public function down()
    {
        Schema::dropIfExists('specialists');
    }
};
