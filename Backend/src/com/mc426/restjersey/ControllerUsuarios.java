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
	public Response Create(@Context HttpHeaders httpheaders, String body) throws JSONException {
		String resposta;
		try {
			JSONObject jsonBody = new JSONObject(body);
			if (jsonBody.getBoolean("gerente")) {
				Gerente gerente = new Gerente(jsonBody.getString("usuario"), jsonBody.getString("senha"), jsonBody.getString("nome"));
				resposta = "Gerente criado:\n" + gerente.toString();
			} else {
				Usuario usuario = new Usuario(jsonBody.getString("usuario"), jsonBody.getString("senha"), jsonBody.getString("nome"));
				resposta = "Usuario criado:\n"+usuario.toString();
			}

			return Response.status(201).entity(resposta).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}
}
