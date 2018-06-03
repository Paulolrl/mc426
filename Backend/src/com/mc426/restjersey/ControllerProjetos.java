package com.mc426.restjersey;

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
			
			if (Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0)) == null)
			{
				System.out.println("Usuario nao encontrado");
			}

			JSONObject jsonBody = new JSONObject(body);

			new Projeto(jsonBody.getString("nome"), jsonBody.getString("descricao"), null);
			System.out.println(
					"Criou projeto " + jsonBody.getString("nome") + " descricao: " + jsonBody.getString("descricao"));
			return Response.status(201).build();

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return Response.status(500).build();
		}
	}
}
