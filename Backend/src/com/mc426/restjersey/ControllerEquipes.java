package com.mc426.restjersey;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.mc426.*;

@Path("equipes")
public class ControllerEquipes {

	@POST
	@Produces("application/json")
	public Response Create(@Context HttpHeaders httpheaders, String body) {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));
			if (!(usuario instanceof Gerente)) {
				resposta = "Usuario nao encontrado ou nao tem permissao de gerente.";
				return Response.status(401).entity(resposta).build();
			}

			JSONObject jsonBody = new JSONObject(body);

			List<Usuario> membros = new ArrayList<Usuario>();
			JSONArray arr = jsonBody.optJSONArray("membros");
			Usuario membro;
			if (arr != null) {
				for (int i = 0; i < arr.length(); i++) {
					membro = Usuario.getPorResource(arr.getString(i));
					if (membro == null) {
						resposta = "Usuario nao encontrado para adicionar na equipe";
						return Response.status(404).entity(resposta).build();
					}
					membros.add(membro);				
				}
			}

			Equipe equipe = new Equipe(jsonBody.getString("nome"), membros, (Gerente) usuario);

			return Response.status(201).entity(equipe.toJson().toString()).build();
		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@Path("{id}")
	@GET
	@Produces("application/json")
	public Response GetEquipe(@PathParam("id") int id, @Context HttpHeaders httpheaders, String body)
			throws JSONException {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));

			if (usuario == null) {
				resposta = "Usuario nao encontrado ou senha incorreta.";
				return Response.status(401).entity(resposta).build();
			}

			Equipe equipe = Equipe.getPorId(id);

			if (equipe == null ||equipe.getNome().equals("dummy")) {
				resposta = "Equipe nao encontrada";
				return Response.status(404).entity(resposta).build();
			}

			return Response.status(200).entity(equipe.toJson().toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@Path("{id}")
	@POST
	@Produces("application/json")
	public Response UpdateEquipe(@PathParam("id") int id, @Context HttpHeaders httpheaders, String body) {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));
			Equipe equipe = Equipe.getPorId(id);
			if (usuario != equipe.getDono()) {
				resposta = "Usuario nao tem permissao para isso.";
				return Response.status(401).entity(resposta).build();
			}

			JSONObject jsonBody = new JSONObject(body);

			List<Usuario> membros = new ArrayList<Usuario>();
			JSONArray arr = jsonBody.optJSONArray("membros");
			Usuario membro;
			if (arr != null) {
				for (int i = 0; i < arr.length(); i++) {
					membro = Usuario.getPorResource(arr.getString(i));
					if (membro == null) {
						resposta = "Usuario nao encontrado para adicionar na equipe";
						return Response.status(404).entity(resposta).build();
					}
					membros.add(membro);				
				}
			}
			
			List<Usuario> membrosNovos = new ArrayList<Usuario>();
			List<Usuario> membrosRemovidos = new ArrayList<Usuario>();
			for (Usuario u : membros)
			{
				if (!equipe.getMembros().contains(u))
					membrosNovos.add(u);
			}

			for (Usuario u : equipe.getMembros())
			{
				if (!membros.contains(u))
					membrosRemovidos.add(u);
			}
			
			equipe.adicionarMembros(membrosNovos);
			equipe.removerMembros(membrosRemovidos);
			
			return Response.status(200).entity(equipe.toJson().toString()).build();
		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

}
