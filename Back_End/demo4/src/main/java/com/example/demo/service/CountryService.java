package com.example.demo.service;

import com.example.demo.model.Country;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CountryService {

    private List<Country> cache = new ArrayList<>();
    private long lastFetchTime = 0;

    public List<Country> getCountries() {

        if(System.currentTimeMillis() - lastFetchTime < 600000 && !cache.isEmpty()) {
            return cache;
        }

        RestTemplate restTemplate = new RestTemplate();

        String url = "https://restcountries.com/v3.1/all";

        List<Map<String, Object>> response =
                restTemplate.getForObject(url, List.class);

        List<Country> countries = new ArrayList<>();

        for(Map<String,Object> c : response){

            Map nameMap = (Map)c.get("name");
            String name = (String)nameMap.get("common");

            List capitals = (List)c.get("capital");
            String capital = capitals != null ? capitals.get(0).toString() : "N/A";

            String region = (String)c.get("region");

            Number populationNum = (Number)c.get("population");
            long population = populationNum.longValue();

            Map flags = (Map)c.get("flags");
            String flag = (String)flags.get("png");

            countries.add(new Country(name, capital, region, population, flag));
        }

        cache = countries;
        lastFetchTime = System.currentTimeMillis();

        return countries;
    }

    public List<Country> searchCountries(String name){

        return getCountries().stream()
                .filter(c -> c.getName().toLowerCase().contains(name.toLowerCase()))
                .toList();
    }
}