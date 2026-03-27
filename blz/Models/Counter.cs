using System.ComponentModel;

namespace blz.Models;

public class Counter
{
    private Counter(){}
    private static Counter _instance = new Counter();

    private readonly object _lock = new();
            
    public static Counter getInstance(){
        return _instance;
    }

    private int _number = 0;
    public void incr()
    {
        lock (_lock)
        {
            _number++;
        }
    }
        
    public int Number
    {
        get => _number;
    }        
}
    

