package com.mc426.restjersey;

import java.io.PrintWriter;
import java.io.StringWriter;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import org.json.JSONException;
import org.json.JSONObject;
import com.mc426.*;

@Path("usuarios")
public class ControllerUsuarios {
	@POST
	@Produces("application/json")
	public Response Create(@Context HttpHeaders httpheaders, String body) throws JSONException {
		String resposta;
		try {
			JSONObject jsonBody = new JSONObject(body);
			Usuario usuario = null;
			
			try {
				if (jsonBody.getBoolean("gerente")) {
					usuario = new Gerente(jsonBody.getString("usuario"), jsonBody.getString("senha"), jsonBody.getString("nome"));
				} else {
					usuario = new Usuario(jsonBody.getString("usuario"), jsonBody.getString("senha"), jsonBody.getString("nome"));
				}
			}catch(Exception e) {
				StringWriter sw = new StringWriter();
				PrintWriter pw = new PrintWriter(sw);
				e.printStackTrace(pw);
				resposta = sw.toString(); // stack trace as a string
				return Response.status(403).entity(resposta).build();
			}
			
			return Response.status(201).entity(usuario.toJson().toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}
	
	@Path("{username}")
	@GET
	@Produces("application/json")
	public Response GetUser(@PathParam("username") String username, @Context HttpHeaders httpheaders, String body) throws JSONException {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));

			if (usuario == null) {
				resposta = "Usuario nao encontrado para autorizacao.";
				return Response.status(401).entity(resposta).build();
			}
			
			usuario = Usuario.getPorUserName(username);

			if (usuario == null) {
				resposta = "Usuario nao encontrado";
				return Response.status(404).entity(resposta).build();
			}
			
			return Response.status(200).entity(usuario.toJson().toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}
}
