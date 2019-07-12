import numpy as np
import pandas as pd
import sys      

f=open("a.txt",'w')

a = pd.read_csv("data.csv")
b = pd.read_csv("test.csv")
test = np.array(b.loc[0])
numpy = np.array(a) 
retval = [None] * 8                     #array for storing final result
offset = [3,3,2]            #offset for analysing different words
x = numpy[:,:-1]                        #training data
y = numpy[:,-1]       


from sklearn.svm import SVC  
svclassifier = SVC(kernel='linear')  

i = 0
s = 0    
                               #starting index for reading word
while i < 2:
    t = np.array(x[:,s:s+offset[i]])
    svclassifier.fit(t, y)
    
    t1= np.array(test[s:s+offset[i]])
    retval[i] = svclassifier.predict(t1)#predcting value and storing in array 
    i += 1;                             
    s = s+offset[i]                   #increasing offset for pointing to next word
    
                  
#till now retval array consists predctions of different words


i = 0
count = -1
prev = 1
store = retval[0]

retval.sort()                       #sorting predicted values for finding the most repeated person
while i < 7:
    if (retval[i] == retval[i+1]):
        prev += 1
        if(count < prev):
            store = retval[i]       #storing name of person with highest frequency
            count = prev
    else :
        prev = 1;
    i += 1
           
print(store)
f.write(store)
f.close()
sys.stdout.flush()                  #flushing value to stdout
