<div class="specification_container">
    <div class="product_detail_header">
        <h2>مشخصات فنی</h2>
        <div>{{$product->ename}}</div>
    </div>
    <table>
        @foreach($product_specs as $spec)
            @if(sizeof($spec->getChild)>0)
                <tr>
                    <td colspan="2" class="head_title">{{$spec->title}}</td>
                </tr>
                @foreach($spec->getChild as $value)
                    @if($value->getValue)
                        <tr>
                            <td class="spec_title"><p>{{$value->title}}</p></td>
                            <td class="spec_value"><p>{{$value->getValue['value']}}</p></td>
                        </tr>
                    @endif
                @endforeach
            @endif
        @endforeach
    </table>

</div>
