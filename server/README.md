<h1 align="center">Fridgefoodies Backend</h1>
<h3 align="center">Postgres, Express, Node, Typescript</h3>
<br>

<br>

<h3>How to Run</h3>

<ul>
    <li>Install the packages: 

```bash
cd server
npm install
```

</li>
    <li>Then, create an environment file `.env` at the root of the directory and set up environment variables:

```bsh
PORT=3000
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=6666
DB_DATABASE=fridgefo
```

</li>
    <li>Copy the database configuration commands found in `server/src/database/config/database.sql` into a the respective PSQL terminal.</li>
    <li>Finally, run the server with `npm run start`</li>
</ul>






<br>

<h3>Commands:</h3>
<ul>
    <li>`npm run start`: Test server live.</li>
    <li>`npm run build`: Create server production files.</li>
</ul>

