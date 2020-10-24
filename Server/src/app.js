import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";

import config from "./config";

const app = express();

app.use(cors(config));

// Import routes

import rolesRouter from "./routes/roles";
import usuarioRouter from "./routes/usuario";

import clienteRouter from "./routes/clientes";


import authRoutes from "./routes/auth";
import authenticateTokenRoutes from "./routes/authenticateToken";

import productoRouter from "./routes/producto";
import proveedorRouter from "./routes/proveedores";


import ventasRouter from "./routes/ventas";
import comprasRouter from "./routes/compras";

// Middlewares
app.use(morgan("dev"));
app.use(json());

// Routes

app.use("/api/roles",rolesRouter);
app.use("/api/usuario",usuarioRouter);

app.use("/api/auth", authRoutes);
app.use("/api/authenticateToken", authenticateTokenRoutes);

app.use("/api/cliente",clienteRouter);

app.use("/api/producto",productoRouter);
app.use("/api/proveedor",proveedorRouter);


app.use("/api/venta",ventasRouter);
app.use("/api/compra",comprasRouter);

export default app;
