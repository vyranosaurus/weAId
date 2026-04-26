package com.hackathon.socomsci.chatonly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.sql.init.SqlInitializationAutoConfiguration;

@SpringBootApplication(
        scanBasePackages = {
                "com.hackathon.socomsci.chatonly",
                "com.hackathon.socomsci.serviceImpl",
        },
        exclude = {
                DataSourceAutoConfiguration.class,
                HibernateJpaAutoConfiguration.class,
                DataSourceTransactionManagerAutoConfiguration.class,
                JpaRepositoriesAutoConfiguration.class,
                SqlInitializationAutoConfiguration.class,
        })
public class ChatOnlyApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(ChatOnlyApplication.class);
        app.setAdditionalProfiles("chatonly");
        app.run(args);
    }
}
