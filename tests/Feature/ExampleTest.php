<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    protected $accessToken;

    public function setUp(): void
    {
        parent::setUp();

        // Define aquí el token de acceso válido
        $this->accessToken = 'XRqud9aNmyRhUejyNt0yPS7EsXFASOWGj6KjdkSR';
    }
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_user_events(): void
    {
        $email = 'sara@mail.com';
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->post("/api/user/$email/events");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name',
                'date',
                'place',
            ],
        ]);
    }

    public function test_event_assistants(): void
    {
        $event = 1;
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->post("/api/event/$event/users");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'name',
                'email',
            ],
        ]);
    }

    public function test_total_assistants(): void
    {
        $event = 2;
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->post("/api/event/$event/count");

        $response->assertStatus(200);
        self::assertEquals('3', $response->json());
    }

    public function test_registered_events(): void
    {
        $email = 'sara@mail.com';
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->post("/api/user/$email/registeredEvents");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name',
                'date',
                'place',
                'registered_date',
                'paid_date',
            ],
        ]);
    }

    public function test_paid_events(): void
    {
        $email = 'sara@mail.com';
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->post("/api/user/$email/paidEvents");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name',
                'date',
                'place',
                'registered_date',
                'paid_date',
            ],
        ]);
    }

    public function test_paid_users(): void
    {
        $event = 1;
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->post("/api/event/$event/paidUsers");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'name',
                'email',
                'registered_date',
                'paid_date',
            ],
        ]);
    }
    public function test_events(): void
    {
        $response = $this->post("/api/events");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name',
                'date',
                'place',
            ],
        ]);
    }
}
