package com.example.health_reporting;

import java.util.List;

public class ListDto<T> {
    private List<T> list;
    private int page;
    private int size;
    private long total;

    public List<T> getList() {
        return list;
    }

    public int getPage() {
        return page;
    }

    public int getSize() {
        return size;
    }

    public long getTotal() {
        return total;
    }

    public void setList(List<T> value) {
        list = value;
    }

    public void setPage( int value) {
        page = value;
    }

    public void setSize(int value) {
        size = value;
    }

    public void setTotal(long value) {
        total = value;
    }
}
