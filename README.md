# Reserva Veiculos

Welcome to the Reserva Veiculos. This is the REST api responsible for serving the [front-end] application. It is built using node.js with typescript. Integration tests are done via jest.

## How it works

Users can user this API for authentication like signing up, signing in and logging out, for reserving vehicles and for getting information about their reserved vehicles or about the available ones.

## How to run

Clone the repository in your computer and go to the newly created directory:

    git clone https://github.com/jhonnatangomes/vehicle-reservation-back-end
    cd vehicle-reservation-back-end

Then, install dependencies:

    npm install

After everything has been installed, enter in createDB folder and run create-databases script:

    cd createDB
    bash create-databases

You might be prompted to type in your password. Then, after creating the databases, run the migrations to create the tables in the databases with:

    npm run migration:run

Then, run the seeds to populate the databases with:

    npm run seed

Now, the application is ready to be used. Here are some commands you can use in this project:

    npm run dev - start the application in development server
    npm run test - runs tests
    npm run test:watch - runs tests with watch enabled

## Endpoints

<details>
<summary>POST /sign-up</summary>
Expects a body in the following format

    {
        name: "Jhonn",
        email: "jhonn@gmail.com",
        password: 12345
    }

Responds with a 201 status when successful.

</details>

<details>
<summary>POST /sign-in</summary>
Expects a body in the following format

    {
        email: "jhonn@gmail.com",
        password: 12345
    }

Responds with an object in the format

    {
        user: {
            name: "Jhonn",
            email: "jhonn@gmail.com"
        },
        token: "abcdef..."
    }

</details>

<details>
<summary>POST /logout</summary>
Expects a request with a bearer token in the authorization header, in the format

    {
        headers: {
            Authorization: Bearer 123...
        }
    }

</details>

<details>
<summary>GET /vehicles</summary>
Expects a bearer token in the header and responds with an array of vehicles on the format

    [
        {
            id: 1,
            name: "aa",
            pricePerDay: "125"
            reservations: {
                id: 2,
                createdAt: "123",
                returnDate: "123",
                totalToPay: 75,
                daysRented: 5,
                isDelayed: false,
                totalDelayFee: 120,
                user: {
                    email: "jhonn@gmail.com"
                }
            },
            images: [
                {
                    id: 1,
                    url: "aaa.com",
                    color: "#FAFAFA"
                }
            ]
        }
    ]

</details>

<details>
<summary>POST /reservation</summary>
Expects a bearer token and a body in the following format

    {
        vehicleId: 1,
        daysRented: 5
    }

Responds with an object in the same format as get vehicles route

</details>

<details>
<summary>POST /reservation/return</summary>
Expects a bearer token and a body in the following format

    {
        vehicleId: 1,
    }

Responds with an object in the same format as get vehicles route

</details>

<details>
<summary>GET /reservation</summary>
Expects a bearer token and responds with an object in the same format as get vehicles route

</details>

[front-end]: https://github.com/jhonnatangomes/vehicle-reservation-front-end
