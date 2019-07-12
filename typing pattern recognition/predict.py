
import numpy as np
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
import sys      


a = pd.read_csv("data.csv")
b = pd.read_csv("test.csv")
test = np.array(b.loc[0])
numpy = np.array(a) 
retval = [None] * 8                     #array for storing final result
offset = [2,4,4,2,5,3,2,3,2]            #offset for analysing different words
x = numpy[:,:-1]                        #training data
y = numpy[:,-1]                         #target data
knn_classifier = KNeighborsClassifier(n_neighbors = 3)

i = 0
s = 0                                   #starting index for reading word
while i < 8:
    t = np.array(x[:,s:s+offset[i]])
    knn_classifier.fit(t,y)
    t1= np.array(test[s:s+offset[i]])
    retval[i] = knn_classifier.predict(t1)#predcting value and storing in array 
    i += 1;                             
    s = s+2+offset[i]                   #increasing offset for pointing to next word
    
                  
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
sys.stdout.flush()                  #flushing value to stdout
