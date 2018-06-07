package com.mc426.restjersey;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.mc426.*;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

@Path("diretorios")
public class ControllerDiretorios {

	@Path("{id}")
	@GET
	@Produces("application/json")
	public Response GetDiretorio(@PathParam("id") int id, @Context HttpHeaders httpheaders) {
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

			return Response.status(200).entity(diretorio.toJson().toString()).build();

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
	public Response GetItem(@PathParam("id") int id, @PathParam("idItem") int idItem, @Context HttpHeaders httpheaders) {
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

			return Response.status(200).entity(ItemCompartilhado.getItemPorId(idItem).toJson().toString()).build();

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

			return Response.status(200).entity(diretorio.adicionarDiretorio(jsonBody.getString("nome")).toJson().toString())
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
					jsonBody.getString("chaveAutenticacao"), jsonBody.getString("link")).toJson().toString()).build();

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
					jsonBody.getString("chaveAutenticacao"), jsonBody.getString("link")).toJson().toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@Path("{id}/itens/{idItem}/download")
	@GET
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response DownloadItem(@PathParam("id") int id, @PathParam("idItem") int idItem,
			@Context HttpHeaders httpheaders) {
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

			ItemCompartilhado item = ItemCompartilhado.getItemPorId(idItem);

			if (!(item instanceof Arquivo)) {
				resposta = "Item fornecido nao e um arquivo existente";
				return Response.status(404).entity(resposta).build();
			}

			return download(((Arquivo) item).getCaminho());

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	private Response download(String fileLocation) {
		Response response = null;

		// Retrieve the file
		File file = new File(fileLocation);
		if (file.exists()) {
			ResponseBuilder builder = Response.ok(file);
			builder.header("Content-Disposition", "attachment; filename=" + file.getName());
			response = builder.build();
		} else {
			response = Response.status(404).entity("FILE NOT FOUND: " + fileLocation).type("text/plain").build();
		}

		return response;
	}

	private static final String SERVER_UPLOAD_LOCATION_FOLDER = "C:\\Users\\Public\\Documents";
	private static int nextFile = 1;

	@POST
	@Path("{id}/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces("application/json")
	public Response uploadFile(@PathParam("id") int id, @FormDataParam("file") InputStream fileInputStream,
			@FormDataParam("file") FormDataContentDisposition contentDispositionHeader) {

		String filePath = SERVER_UPLOAD_LOCATION_FOLDER + "\\" + (nextFile++) + "-"
				+ contentDispositionHeader.getFileName();

		String resposta;
		Diretorio diretorio = Diretorio.getDiretorioPorId(id);

		if (diretorio == null) {
			resposta = "Diretorio nao encontrado";
			return Response.status(404).entity(resposta).build();
		}

		// save the file to the server
		saveFile(fileInputStream, filePath);

		return Response.status(200)
				.entity(diretorio.adicionarArquivo(contentDispositionHeader.getFileName(), filePath).toJson().toString()).build();
	}

	// save uploaded file to a defined location on the server
	private void saveFile(InputStream uploadedInputStream, String serverLocation) {

		try {
			OutputStream outpuStream = new FileOutputStream(new File(serverLocation));
			int read = 0;
			byte[] bytes = new byte[1024];

			outpuStream = new FileOutputStream(new File(serverLocation));
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				outpuStream.write(bytes, 0, read);
			}
			outpuStream.flush();
			outpuStream.close();
		} catch (IOException e) {

			e.printStackTrace();
		}

	}

}
