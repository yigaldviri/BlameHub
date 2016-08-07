package blamehub.services.solr;

import blamehub.shared.model.CommitDoc;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.GroupCommand;

import java.io.IOException;
import java.util.List;

public interface SolrService {
    void addCommitDocs(List<CommitDoc> commitDocs);
    List<GroupCommand> findByTerms(String terms) throws IOException, SolrServerException;
}
