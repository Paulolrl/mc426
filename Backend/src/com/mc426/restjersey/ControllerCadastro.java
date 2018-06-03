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

@Path("cadastro")
public class ControllerCadastro {
	@POST
	public Response Create(@Context HttpHeaders httpheaders, String body) throws JSONException {
		try {
			JSONObject jsonBody = new JSONObject(body);
			if (jsonBody.getBoolean("gerente")) {
				new Gerente(jsonBody.getString("usuario"), jsonBody.getString("senha"), jsonBody.getString("nome"));
				System.out.println("Criou gerente " + jsonBody.getString("usuario") + " senha: "
						+ jsonBody.getString("senha") + " nome: " + jsonBody.getString("nome"));
			} else {
				new Usuario(jsonBody.getString("usuario"), jsonBody.getString("senha"), jsonBody.getString("nome"));
				System.out.println("Criou usuario " + jsonBody.getString("usuario") + " senha: "
						+ jsonBody.getString("senha") + " nome: " + jsonBody.getString("nome"));
			}

			return Response.status(201).build();

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return Response.status(500).build();
		}
	}
}
