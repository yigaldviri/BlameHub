package blamehub.shared.model;

import org.apache.solr.client.solrj.beans.Field;
import org.springframework.data.annotation.Id;

import java.util.Date;

public class CommitDoc {

    @Id
    @Field
    private String id;

    @Field
    private String name_txt_en;

    @Field
    private Date date_dt;

    @Field
    private String message;

    @Field
    private Float score;

    public CommitDoc() {}
    public CommitDoc(String id, String name_txt_en, Date date_dt , String message, Float score) {
        this.id = id;
        this.name_txt_en = name_txt_en;
        this.date_dt = date_dt;
        this.message = message;
        this.score = score;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName_txt_en() {
        return name_txt_en;
    }

    public void setName_txt_en(String name_txt_en) {
        this.name_txt_en = name_txt_en;
    }

    public Date getDate_dt() {
        return date_dt;
    }

    public void setDate_dt(Date date_dt) {
        this.date_dt = date_dt;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }
}
