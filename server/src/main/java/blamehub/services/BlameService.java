package blamehub.services;


import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.GroupCommand;
import org.eclipse.jgit.api.errors.GitAPIException;

import java.io.IOException;
import java.util.List;

public interface BlameService {

    void scanRepo(String url, String repoUsername, String repoPassword) throws GitAPIException, IOException;

    List<GroupCommand> search(String terms) throws IOException, SolrServerException;

    String getRepoUrl();

}
