<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedInteger('base_price')->nullable();
            $table->unsignedTinyInteger('duration_hours')->nullable();
            $table->unsignedInteger('photo_count')->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('photos');
    }
};
