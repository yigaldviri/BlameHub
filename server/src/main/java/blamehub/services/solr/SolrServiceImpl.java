package blamehub.services.solr;

import blamehub.services.solr.dao.CommitDocRepository;
import blamehub.shared.model.CommitDoc;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.GroupCommand;
import org.apache.solr.client.solrj.response.GroupResponse;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class SolrServiceImpl implements SolrService{

    @Inject
    private CommitDocRepository commitDocRepository;

    @Inject
    private SolrClient solrClient;

    @Override
    public void addCommitDocs(List<CommitDoc> commitDocs) {
        if (commitDocs != null && !commitDocs.isEmpty()){
            this.commitDocRepository.save(commitDocs);
        }
    }

    // TODO: Move to use Spring as well
    @Override
    public List<GroupCommand> findByTerms(String terms) throws IOException, SolrServerException {
        SolrQuery solrQuery = new  SolrQuery().setQuery(terms);
        solrQuery.set("defType","edismax");
        solrQuery.set("fl","*,score");
        solrQuery.set("bf","recip(ms(NOW/DAY,date_dt),3.16e-11,1,1)");
        solrQuery.set("fq","date_dt:{NOW/DAY-2YEARS TO NOW/DAY+1DAY}");
        solrQuery.set("group", true);
        solrQuery.set("group.field", "name_txt_en");
        solrQuery.set("group.limit", 3);
        solrQuery.set("rows", 3);
        QueryResponse query = solrClient.query(solrQuery);

        GroupResponse results = query.getGroupResponse();
        return results.getValues();
    }


}
