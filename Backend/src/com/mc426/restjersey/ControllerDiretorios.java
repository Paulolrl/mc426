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

@Path("diretorios")
public class ControllerDiretorios {

	@Path("{id}")
	@GET
	@Produces("application/json")
	public Response GetDiretorio(@PathParam("id") int id, @Context HttpHeaders httpheaders, String body) {
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

			Diretorio diretorio = Diretorio.getDiretorioPorId(id);

			if (diretorio == null) {
				resposta = "Diretorio nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!usuario.participaProjeto(diretorio.getProjeto())) {
				resposta = "Usuario nao tem permissao para isso";
				return Response.status(401).entity(resposta).build();
			}

			return Response.status(200).entity(diretorio.toJson()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@Path("{id}/itens/{idItem}")
	@GET
	@Produces("application/json")
	public Response GetItem(@PathParam("id") int id, @PathParam("idItem") int idItem, @Context HttpHeaders httpheaders,
			String body) {
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

			Diretorio diretorio = Diretorio.getDiretorioPorId(id);

			if (diretorio == null) {
				resposta = "Diretorio nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!usuario.participaProjeto(diretorio.getProjeto())) {
				resposta = "Usuario nao tem permissao para isso";
				return Response.status(401).entity(resposta).build();
			}

			return Response.status(200).entity(ItemCompartilhado.getItemPorId(idItem)).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@Path("{id}/subdiretorio")
	@POST
	@Produces("application/json")
	public Response CriaSubdiretorio(@PathParam("id") int id, @Context HttpHeaders httpheaders, String body) {
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

			Diretorio diretorio = Diretorio.getDiretorioPorId(id);

			if (diretorio == null) {
				resposta = "Diretorio nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!usuario.participaProjeto(diretorio.getProjeto())) {
				resposta = "Usuario nao tem permissao para isso";
				return Response.status(401).entity(resposta).build();
			}

			JSONObject jsonBody = new JSONObject(body);

			return Response.status(200).entity(diretorio.adicionarDiretorio(jsonBody.getString("nome")).toJson())
					.build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@Path("{id}/repositorio")
	@POST
	@Produces("application/json")
	public Response CriaRepositorio(@PathParam("id") int id, @Context HttpHeaders httpheaders, String body) {
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

			Diretorio diretorio = Diretorio.getDiretorioPorId(id);

			if (diretorio == null) {
				resposta = "Diretorio nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!usuario.participaProjeto(diretorio.getProjeto())) {
				resposta = "Usuario nao tem permissao para isso";
				return Response.status(401).entity(resposta).build();
			}

			JSONObject jsonBody = new JSONObject(body);

			return Response.status(200).entity(diretorio.adicionarRepo(jsonBody.getString("nome"),
					jsonBody.getString("chaveAutenticacao"), jsonBody.getString("link")).toJson()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@Path("{id}/documento")
	@POST
	@Produces("application/json")
	public Response CriaDoc(@PathParam("id") int id, @Context HttpHeaders httpheaders, String body) {
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

			Diretorio diretorio = Diretorio.getDiretorioPorId(id);

			if (diretorio == null) {
				resposta = "Diretorio nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!usuario.participaProjeto(diretorio.getProjeto())) {
				resposta = "Usuario nao tem permissao para isso";
				return Response.status(401).entity(resposta).build();
			}

			JSONObject jsonBody = new JSONObject(body);

			return Response.status(200).entity(diretorio.adicionarDocGoogle(jsonBody.getString("nome"),
					jsonBody.getString("chaveAutenticacao"), jsonBody.getString("link")).toJson()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}
}
