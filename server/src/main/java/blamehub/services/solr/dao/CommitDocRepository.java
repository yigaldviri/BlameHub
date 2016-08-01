package blamehub.services.solr.dao;

import blamehub.shared.model.CommitDoc;
import org.springframework.data.repository.query.Param;
import org.springframework.data.solr.repository.Boost;
import org.springframework.data.solr.repository.Query;
import org.springframework.data.solr.repository.SolrCrudRepository;

import java.util.Date;
import java.util.List;

public interface CommitDocRepository extends SolrCrudRepository<CommitDoc, String>{

    List<CommitDoc> findByMessageContaining(String message);

    @Query(value = "?0")
    List<CommitDoc> findBySearchTerm(String search);

}