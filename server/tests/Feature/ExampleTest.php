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
        $this->accessToken = '649V8hvqpJBZVAIesJ7oO0CyRUtB52rQVnaT2myQ';
    }

    public function test_user_events(): void
    {
        $email = 'sara@gmail.com';
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->get("/api/user/$email/events");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'IdEvents',
            ],
        ]);
    }

    public function test_event_assistants(): void
    {
        $event = 1;
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->get("/api/event/$event/users");

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
        $event = 1;
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->get("/api/event/$event/count");
        print($response->json());

        $response->assertStatus(200);
        self::assertEquals('1', $response->json());
    }

    public function test_registered_events(): void
    {
        $email = 'sara@gmail.com';
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->get("/api/user/$email/registeredEvents");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'IdEvents',
                'registered_date',
                'payment_id',
            ],
        ]);
    }

    public function test_paid_events(): void
    {
        $email = 'sara@gmail.com';
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->get("/api/user/$email/paidEvents");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'IdEvents',
                'registered_date',
                'payment_id',
            ],
        ]);
    }

    public function test_paid_users(): void
    {
        $event = 1;
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->get("/api/event/$event/paidUsers");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'name',
                'email',
                'registered_date',
                'payment_id',
            ],
        ]);
    }
    /*public function test_events(): void
    {
        $response = $this->get("/api/events");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name',
                'date',
                'place',
            ],
        ]);
    }*/

    public function test_register(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->post("/api/register", ['email' => 'peter@gmail.com', 'event_id' => '1', 'payment_id' => '2']);

        $response->assertStatus(200);
    }

    public function test_IsRegistered(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->get("/api/isRegistered?email=sara@gmail.com&event_id=2");
        print_r($response->json());
        $response->assertStatus(200);
    }

    /*public function test_filter(): void
    {
        //$response = $this->get("/api/filter", ['name' => 'Harry', 'place' => 'Lisbon']);
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->accessToken)->get("/api/filter?name=Harry&date=&place=Lisbon");
        var_dump($response->json());

        $response->assertStatus(200);
    }*/
}
