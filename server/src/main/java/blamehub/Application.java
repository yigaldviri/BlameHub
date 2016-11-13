package blamehub;

import org.apache.log4j.Logger;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.common.StringUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.solr.repository.config.EnableSolrRepositories;

import javax.annotation.Resource;

@SpringBootApplication
@PropertySource("server.properties")
@EnableSolrRepositories(basePackages={"blamehub.services.solr"}, multicoreSupport=true)
public class Application extends SpringBootServletInitializer {

    private static final Logger logger = Logger.getLogger(Application.class);
    private static final String SOLR_SUFFIX = ":8983/solr/blamehub";

    @Resource
    private Environment environment;

    public Application(){}

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    @Bean
    public SolrClient solrClient() throws Exception {
        String solrServer = figureSolrServer();
        return new HttpSolrClient(solrServer);
    }

    private String figureSolrServer() {
        // when using Docker we get the Solr container dynamically and not from properties file
        String solrServer = System.getProperty("solr.url");
        if(StringUtils.isEmpty(solrServer)){
            solrServer = environment.getRequiredProperty("solr.url");
        }

        logger.info("Using " + solrServer + " as Solr server");
        return solrServer + SOLR_SUFFIX;
    }

}
