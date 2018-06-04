package com.mc426.restjersey;

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
	public Response Create(@Context HttpHeaders httpheaders, String body) throws JSONException {
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				return Response.status(401).build();
			}
			
			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));
			if (!(usuario instanceof Gerente)){
				System.out.println("Usuario nao encontrado ou nao tem permissao de gerente.");
				return Response.status(401).build();
			}

			JSONObject jsonBody = new JSONObject(body);
			

			new Projeto(jsonBody.getString("nome"), jsonBody.getString("descricao"), null, (Gerente) usuario);
			System.out.println(
					"Criou projeto " + jsonBody.getString("nome") + " descricao: " + jsonBody.getString("descricao"));
			return Response.status(201).build();

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return Response.status(500).build();
		}
	}
	
	@Path("{id}")
	@DELETE
	public Response Delete(@Context HttpHeaders httpheaders, @PathParam("id") int id) throws JSONException{
		try {
			
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				return Response.status(401).build();
			}
			
			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));
			
			if(usuario == null) {
				System.out.println("Usuario nao encontrado");
				return Response.status(401).build();
			}
			
			Projeto projeto = Projeto.getPorId(id);
			
			if (projeto == null) {
				System.out.println("Projeto nao encontrado");
				return Response.status(401).build();
			}
			
			if (!projeto.getDono().equals(usuario)) {
				System.out.println("Usuario nao e dono");
				return Response.status(401).build();
			}
			Gerente gerente = (Gerente) usuario;
			
			gerente.removerProjeto(projeto);
			
			return Response.status(200).build();
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return Response.status(500).build();
		}
	}
}
