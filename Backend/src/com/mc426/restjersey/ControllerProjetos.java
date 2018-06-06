package com.mc426.restjersey;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.ws.rs.DELETE;
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

@Path("projetos")
public class ControllerProjetos {

	@POST
	public Response Create(@Context HttpHeaders httpheaders, String body) {
		String response;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				response = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(response).build();
			}
			
			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));
			if (!(usuario instanceof Gerente)){
				response = "Usuario nao encontrado ou nao tem permissao de gerente.";
				return Response.status(401).entity(response).build();
			}

			JSONObject jsonBody = new JSONObject(body);
			

			Projeto projeto = new Projeto(jsonBody.getString("nome"), jsonBody.getString("descricao"), null, (Gerente) usuario);
			return Response.status(201).entity(projeto.toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			response = sw.toString(); // stack trace as a string
			return Response.status(500).entity(response).build();
		}
	}
	
	@Path("{id}")
	@DELETE
	public Response Delete(@Context HttpHeaders httpheaders, @PathParam("id") int id) {
		String response;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				response = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(response).build();
			}
			
			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));
			
			if(usuario == null) {
				response = "Usuario nao encontrado.";
				return Response.status(401).entity(response).build();
			}
			
			Projeto projeto = Projeto.getPorId(id);
			
			if (projeto == null) {
				response = "Projeto nao encontrado";
				return Response.status(401).entity(response).build();
			}
			
			if (!projeto.getDono().equals(usuario)) {
				response = "Usuario nao e dono";
				return Response.status(401).entity(response).build();
			}
			Gerente gerente = (Gerente) usuario;
			
			gerente.removerProjeto(projeto);
			response = "Projeto removido com sucesso.";
			return Response.status(200).entity(response).build();
		}catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			response = sw.toString(); // stack trace as a string
			return Response.status(500).entity(response).build();
		}
	}
}
